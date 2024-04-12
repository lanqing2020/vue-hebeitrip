import { useUserStore } from "@/stores/index.js";
import { showToast } from "vant";
import router from "@/router/index.js";
import { user } from "@/apis/index.js";

/**
 * 在登录检查是否已登录
 * @returns {boolean}
 */
export function checkLogged() {
    const hasLogged = useUserStore().getLogged();
    if (hasLogged) {
        showToast({
            type: "success",
            message: "您已登录",
            onClose: () => {
                router.push({path: "/user"});
            }
        });
        return true;
    } else {
        return false;
    }
}

export function clearLogged() {
    useUserStore().setToken("");
    router.push({path: "/login"});
}