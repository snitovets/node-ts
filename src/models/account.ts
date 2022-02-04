import mongoose from "mongoose";

export interface AccountAttrs {
	owner: mongoose.Types.ObjectId;
	address: string;
}

export interface AccountDoc extends mongoose.Document, AccountAttrs {
	version: number;
}

interface AccountModel extends mongoose.Model<AccountDoc> {
	build(attrs: AccountAttrs): AccountDoc;
}

const AccountSchema: mongoose.Schema<AccountDoc, AccountModel> = new mongoose.Schema(
	{
		owner: {
			type: mongoose.Types.ObjectId,
			required: true
		},
		address: {
			type: String,
			required: true
		}
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
			}
		}
	}
);

AccountSchema.set("versionKey", "version");
AccountSchema.statics.build = (attrs: AccountAttrs) => {
	return new Account(attrs);
};

const Account = mongoose.model("account", AccountSchema);

export { Account };
