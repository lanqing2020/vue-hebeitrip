import { useUserStore } from "@/stores/index.js";
import { showToast } from "vant";
import { useRouter } from "vue-router";

/**
 * 检查是否登录过
 * @returns {boolean}
 */
export function checkLogged() {
    const token = useUserStore().getToken();
    if (token) {
        const router = useRouter();
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
    const router = useRouter();
    router.push({path: "/login"});
}