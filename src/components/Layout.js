import LoadingIndicator from "./LoadingIndicator";
import  { Suspense } from "react";
import BurgerMenu from "./burgerMenu";
import { Outlet } from "react-router-dom";


export default function Layout() {
    return (
        <>
            <BurgerMenu />
            <main>
                <Suspense fallback={<LoadingIndicator />}>
                    <Outlet />
                </Suspense>
            </main>
        </>
    )
}