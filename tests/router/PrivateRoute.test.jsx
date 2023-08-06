import { render,screen } from "@testing-library/react";
import { AuthContext } from "../../src/auth";
import { PrivateRoute } from "../../src/router/PrivateRoute";
import { MemoryRouter, Route, Routes } from "react-router";

describe('Pruebas en PrivateRoute', () => {


    test('Si está autenticado debe de mostrar el children', () => {

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user : {
                id: 'abc',
                name: 'Juan Carlos'
            }
        }

        render(
            <AuthContext.Provider value= {contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <PrivateRoute>
                            <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>

            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta privada')).toBeTruthy();

        expect(localStorage.setItem).toHaveBeenCalledWith("lastPath", "/marvel");

    });
});