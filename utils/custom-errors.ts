import { AuthError } from "next-auth";


export class OAuthAccountLinkedError extends AuthError {
	static type = "OAuthAccountLinkedError";
}