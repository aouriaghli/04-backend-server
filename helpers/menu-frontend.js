const getMenuFrontend = (role = 'USER_ROLE') => {
    const menu = [
        { titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu:[
            { titulo: 'Main', url:'/'},
            { titulo: 'Gráficas', url:'grafica1'},
            { titulo: 'ProgressBard', url:'progress'}, //sin poner la barra antes de progress, si pongo la barra tendria que poner tb dashboard /dashboard/progress
            { titulo: 'Promesas', url:'promesas'},
            { titulo: 'Rxjs', url:'rxjs'},
          ]
        },
        { titulo: 'Mantenimientos',
          icono: 'mdi mdi-folder-lock-open',
          submenu:[
            //{ titulo: 'Usuarios', url:'usuarios'},
            { titulo: 'Hospitales', url:'hospitales'},
            { titulo: 'Médicos', url:'medicos'},
          ]
        },
      ];

      if (role === 'ADMIN_ROLE' ){
        menu[1].submenu.unshift({ titulo: 'Usuarios', url:'usuarios'});
      }

      return menu;
}

module.exports = {
    getMenuFrontend,
}