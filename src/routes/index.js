import React from 'react';
import { Redirect } from 'react-router-dom';

// Authentication related pages
import Feed from 'pages/_/feed';
import Users from 'pages/_/users';
import profile from 'pages/_/profile';
import Mapcrime from 'pages/_/MapCrime/MapCrime';
import Posts from 'pages/_/posts';
import MapLayout from 'components/VerticalLayout/MapLayout';
import UserPermissions from 'pages/_/permissions';
import Timeline from 'pages/_/timeline';
import Dashboard from 'pages/_/dashboard';
import PhoneAuth from 'pages/Authentication/PhoneAuth';
import LandingPage from 'pages/_/landing';
import Login from '../pages/Authentication/Login';
import Logout from '../pages/Authentication/Logout';

// App Routes

const hiddenRoutes = [
    {
        path: '/users/edit',
        icon: 'fas fa-users',
        title: 'User Permissions',
        key: 'editPermissions',
        component: UserPermissions,
    },
];

const sideBarRoutes = [
    { path: '/dashboard', icon: 'fas fa-columns', title: 'Dashboard', key: 'dashboard', component: Dashboard },
    { path: '/feed', icon: 'fas fa-globe', title: 'Feed', key: 'feed', component: Feed },
    { path: '/timeline', icon: 'fas fa-clock', title: 'Time Line', key: 'timeline', component: Timeline },
    { path: '/users', icon: 'fas fa-users', title: 'Users', key: 'users', component: Users, roles: ['admin'] }, // doesn't appear for users
    {
        path: '/posts',
        icon: 'fas fa-archive',
        title: 'Post Management',
        key: 'poststable',
        component: Posts,
    },
    { path: '/profile', icon: 'fas fa-user', title: 'User Profile', key: 'profile', component: profile },
    { path: '/map', icon: 'fas fa-map', title: 'Map', key: 'map', component: Mapcrime, layout: MapLayout },
];

const authProtectedRoutes = [...hiddenRoutes, ...sideBarRoutes];

const publicRoutes = [
    // this route should be at the end of all other routes
    { path: '/landing', exact: true, component: LandingPage },
    { path: '/', exact: true, component: () => <Redirect to="/landing" /> },
    { path: '/logout', icon: 'fas fa-power', component: Logout },
    { path: '/login', component: Login },
    {
        path: '/auth-phone',
        component: PhoneAuth,
    },
];

export { sideBarRoutes, authProtectedRoutes, publicRoutes };
