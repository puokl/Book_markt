import jwt from "jsonwebtoken";
import config from "config";

// const privateKey = config.get<string>("privateKey");
// const publicKey = config.get<string>("publicKey");
// const privateKey = process.env.PRIVATEKEY.replace(/\\n/g, "\n");
// const publicKey = process.env.PUBLICKEY.replace(/\\n/g, "\n");
// const privateKey = Buffer.from(process.env.PRIVATEKEY, "base64").toString(
//   "ascii"
// );
// const publicKey = Buffer.from(process.env.PUBLICKEY, "base64").toString(
//   "ascii"
// );
const privateKey = `${process.env.PRIVATEKEY}`;
const publicKey = `${process.env.PUBLICKEY}`;

export function signJwt(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(
    object,
    privateKey
    //   {
    //   ...(options && options), // we spread (if options exists) to provide an alg option
    //   algorithm: "RS256",
    // }
  );
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
}
