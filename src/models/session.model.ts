import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./user.model";

export class Session {
  @prop()
  user: Ref<User>;

  @prop()
  valid: boolean;
}

const SessionModel = getModelForClass(Session, {
  schemaOptions: { timestamps: true },
});

export default SessionModel;
