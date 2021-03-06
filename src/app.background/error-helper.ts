import { AuthHelper } from "./auth-helper";

export class ErrorHelper {
    static checkErrors(json: any): number {
        if (json.error) {
            console.warn("error occured during response: ", JSON.stringify(json));
            let code: number = json.error.error_code;
            switch (code) {
                case 5: // problems with authorization need to get new access_token
                    console.log("authorization issue, trying to reset session");
                    AuthHelper.clearSession();
                    AuthHelper.authorize(true);
                    break;
                case 6:
                    console.warn("too many requests per second");
                    break;
                default:
                    console.error("unknown error", json);
                    break;
            }
            console.log("error code", code);
            return code;
        }
        return 0;
    }
}

/*
captcha_img: "https://api.vk.com/captcha.php?sid=826852769372&s=1"
captcha_sid: "826852769372"
error_code: 14
error_msg: "Captcha needed"
*/

/*
error_code: 9
error_msg: "Flood control: same message already sent"
*/