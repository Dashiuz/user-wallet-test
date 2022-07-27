import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ require: true })
  fullname: string;

  @Prop({ require: true, unique: true })
  email: string;

  @Prop({ require: true })
  password: string;

  @Prop({ require: true })
  dni: string;

  @Prop({ require: true })
  address: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const userSchema = SchemaFactory.createForClass(User);
