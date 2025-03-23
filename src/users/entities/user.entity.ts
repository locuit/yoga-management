import {
  Column,
  AfterLoad,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { EntityHelper } from 'src/utils/entity-helper';

import { Exclude } from 'class-transformer';
import { hashPassword } from 'src/utils/helpers';

export enum UserStatus {
  Active = 'active',
  Inactive = 'inactive',
}

export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  Staff = 'staff',
  Trainer = 'trainer',
}

@Entity()
export class User extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true })
  username: string;

  @Index()
  @Column({ type: String, nullable: true })
  fullName: string;

  @Column({ type: String, unique: true, nullable: true })
  email: string | null;

  @Column({ type: String, nullable: true })
  phoneNumber: string | null;

  @Column({ type: 'float', nullable: true })
  salary: number | null;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Exclude({ toPlainOnly: true })
  public previousPassword: string;

  @AfterLoad()
  public loadPreviousPassword(): void {
    this.previousPassword = this.password;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.previousPassword !== this.password && this.password) {
      this.password = await hashPassword(this.password);
    }
  }

  @Column({ type: 'enum', enum: UserStatus, default: UserStatus.Inactive })
  status: UserStatus;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Staff })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: String, nullable: true })
  @Index()
  @Exclude({ toPlainOnly: true })
  hash: string | null;

  @UpdateDateColumn()
  updatedAt: Date;
}
