import Navbar from "./Navbar";
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import './layout.css';

export default function Layout() {
    return (
      <div className="main-layout">
      <header><Navbar /></header>
      <main><Outlet /></main>
      <footer><Footer /></footer>
      </div>
    );
  }