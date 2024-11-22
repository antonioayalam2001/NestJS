import * as bcrypt from 'bcrypt';
import { Product } from 'src/products/entities';
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity('users')
export class Users {

    @PrimaryGeneratedColumn('uuid')
    id: string
    @Column('text', { unique: true, nullable: false })
    email: string
    @Column('text', { nullable: false, select: false })
    password: string
    @Column('text', { array: true, nullable: false, default: ['user'] })
    role: string[]
    @Column('text', { nullable: false })
    fullName: string
    @Column('bool', { default: true, nullable: false })
    isActive: boolean

    @OneToMany(
        () => Product,
        (product) => product.user,
    )
        product: Product

    @BeforeInsert()
    formatFields() {
        this.email = this.email.toLowerCase().trim()
        this.fullName = this.fullName.trim()
    }

    @BeforeInsert()
    hashPassword() {
        const hashedPassword = bcrypt.hashSync(this.password, 10)
        this.password = hashedPassword
    }

    @BeforeUpdate()
    formatFieldsBeforeUpdate() {
        this.formatFields()
    }
}
