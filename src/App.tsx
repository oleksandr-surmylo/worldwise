import React from 'react';
import './App.css';
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList/CityList";
import CountryList from "./components/CountryList/CountryList";
import City from "./components/City/City";
import Form from "./components/Form/Form";
import { CitiesProvider } from "./contexts/CitiesContext/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute  from './pages/ProtectedRoute'

function App () {


    return (
        <AuthProvider>
            <CitiesProvider>
                <HashRouter>
                    <Routes>
                        <Route index element={ <Homepage/> }/>
                        <Route path="product" element={ <Product/> }/>
                        <Route path="pricing" element={ <Pricing/> }/>
                        <Route path="login" element={ <Login/> }/>
                        <Route
                            path="app"
                            element={
                                <ProtectedRoute>
                                    <AppLayout/>
                                </ProtectedRoute> }
                        >
                            <Route index element={ <Navigate replace to="cities"/> }/>
                            <Route path='cities' element={ <CityList/> }/>
                            <Route path="cities/:id" element={ <City/> }/>
                            <Route path='countries' element={ <CountryList/> }/>
                            <Route path='form' element={ <Form/> }/>
                        </Route>
                        <Route path="*" element={ <PageNotFound/> }/>
                    </Routes>
                </HashRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}

export default App;
