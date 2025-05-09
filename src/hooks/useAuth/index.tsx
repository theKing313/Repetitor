import { useRouter } from "next/navigation";
import { createAccount, createAuth2Session, createSession, createUser, deleteSession, getAccount } from "@/api";

import type { IAuthError } from "./types";
import { ID } from "appwrite";

// TODO: Разобраться с typescript, разобраться с AuthError

export default ()  =>{
    const router = useRouter();

    function AuthError({ status, message }: IAuthError) {
        this.status = status;
        this.message = message;
    }

    const signIn = async (data: { email: string; password: string }) => {
        const isExistsSession = await getAccount();

        if (isExistsSession) await deleteSession();

        const isValid = await createSession(data);

        if (!isValid) {
            throw new AuthError({ status: 401, message: "Неверный логин или пароль" });
        }

        const account = await getAccount();

        // if (!account?.labels.includes("hotelAdmin")) {
        //     throw new AuthError({ status: 403, message: "Доступ к ресурсу запрещен" });
        // }

        localStorage.setItem("user", JSON.stringify(account));
        router.push("/announcements");
    };

    const signOut = async () => {
        await deleteSession();

        localStorage.setItem("user", "");
        router.push("/auth/login");
    };

    const signUp = async (data: { email: string; password: string; name: string }) => {
        try {
            // 1️⃣ Создание аккаунта
            const userAccount = await createAccount({
                userId: ID.unique(), // Генерация уникального ID
                email: data.email,
                password: data.password,
                name: data.name
            });
    
            if (!userAccount) {
                throw new Error('Не удалось создать аккаунт');
            }
    
            // const isValidSession = await createSession(
            //     data
            // );
            // if (!isValidSession) {
            //     throw new Error('Не удалось войти после регистрации');
            // }
            // 3️⃣ Получаем данные о пользователе
            // const account = await getAccount();
            // if (!account) {
            //     throw new Error('Не удалось получить данные аккаунта');
            // }
            // // 4️⃣ Сохраняем в localStorage
            // localStorage.setItem("user", JSON.stringify(account));
            // // 5️⃣ Перенаправляем
            const isExistsSession = await getAccount();

            if (isExistsSession) await deleteSession();
    
            const isValid = await createSession(data);
            if (!isValid) {
                throw new AuthError({ status: 401, message: "Неверный логин или пароль" });
            }
    
            const account = await getAccount();
            console.log(account)
            const createUserInfo = await createUser(account);
            console.log(createUserInfo)
            if(!createUserInfo){
                throw new AuthError({ status: 401, message: "User is not created" });
            }else{
                localStorage.setItem("user", JSON.stringify(account));
                router.push("/announcements");
            }
            
        } catch (err) {
            console.error(err);
            throw err;
        }
    };
    const auth2 = async ()=>{
        const s = await createAuth2Session();
        console.log(s)
    }
    return { signIn,signUp, signOut,auth2 };
};
