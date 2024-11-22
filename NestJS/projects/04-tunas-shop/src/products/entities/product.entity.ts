import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { Users } from "src/auth/entities/users.entity";

//Representacion del objeto para la base de datos, esto se transofrma directamente a la tabla 
@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column('varchar', { length: 255, unique: true })
    title: string;
    
    @Column('float', { default: 0.0 })
    price: number;
    
    @Column('text', { nullable: true })
    description: string;
    
    @Column('text', { unique: true })
    slug: string

    @Column('varchar', { length: 255 })
    type: string
    
    @Column('int', { default: 0 })
    stock: number
    
    @Column('text', { array: true })
    sizes: string[]
    
    @Column('text')
    gender: string
    
    @Column('text', {
        array: true,
        nullable: true,
        default: []
    })
    tags: string[]
    
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        {cascade: true, eager: true}
    )
    images?: ProductImage[]

    @ManyToOne(
        () => Users,
        (user => user.product),
        {cascade: true, eager: true}
    )
    user: Users

    //Permite realizar acciones antes de ejecutarlo en la base de datos
    @BeforeInsert()
    formatSlug() {
        if (!this.slug) {
            this.slug = this.title
        }
        this.slug = this.slug.toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
    
    @BeforeUpdate()
    formatSlugUpdate() {
        this.slug = this.slug.toLowerCase()
        .replaceAll(' ', '_')
        .replaceAll("'", '');
    }
}
