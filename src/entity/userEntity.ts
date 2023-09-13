import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Base } from './baseEntity';
import { gender } from './enum/gender.enum';

@Entity()
export class User extends Base{
 

  @Column({ length: 500 })
  firstName: string;

  @Column('text')
  lastName: string;

  @Column({unique: true})
  email: string;

  
  @Column({ length: 500 })
  password: string;

  @Column({
    type: "enum",
    enum: gender,
    default: gender.UNSPECIFIED
})
  gender:gender



 

//   @Column({ default: true })
//   isActive: boolean;

}