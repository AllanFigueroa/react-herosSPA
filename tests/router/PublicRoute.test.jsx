import { render,screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { AuthContext } from "../../src/auth";
import { PublicRoute } from '../../src/router/PublicRoute';


describe('Pruebas en PublicRoute', () => {

    test('Si no está autenticado debe de mostrar el children', () => {
        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value= {contextValue}>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect(screen.getByText('Ruta pública')).toBeTruthy();

    });

    test('Si está autenticado debe navegar', () => {


        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC123'
            }
        }
        
        render(
            <AuthContext.Provider value= {contextValue}>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path="login" element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        } />    
                        <Route path="marvel" element={<h1>Página Marvel</h1>} />
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect(screen.getByText('Página Marvel')).toBeTruthy();
    });
});