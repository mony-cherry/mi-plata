let opcion;

do {
    opcion = prompt(
        "Bienvenido a Mi Plata 🏦\n" +
        "1. Iniciar sesión\n" +
        "2. Registrarse\n" +
        "3. Salir\n" +
        "Elija una opción:"
    );

    switch(opcion) {
        case "1":
            alert("Función iniciar sesión pendiente...");
            break;

        case "2":
            alert("Función registro pendiente...");
            break;

        case "3":
            alert("Gracias por usar Mi Plata");
            break;

        default:
            alert("Opción inválida");
    }

} while(opcion !== "3");