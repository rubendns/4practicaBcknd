import { Command } from 'commander';

const program = new Command();

program
    .option('-d', 'Variable para debug', false) //primero va la variable, luego la descripcion y al final puede ir un valor por defecto.
    //.option('-p <port>', 'Puerto del servidor', 8080)
    .option('--mode <mode>', 'Modo de trabajo', 'dev')

    .requiredOption('-u <user>', 'Usuario que va a utilizar el aplicativo.', 'No se ha declarado un usuario.');//RequireOption usa un mensaje por defecto si no está presente la opción.
program.parse(); //Parsea los comandos y valida si son correctos.

process.on("exit", code => {
    console.log("Este codigo se ejecuta antes de salir del proceso.");
    console.log("Codigo de salida del proceso: " + code);
});

process.on("uncaughtException", exception => {
    console.log("Esta exception no fue capturada, o controlada.");
    console.log(`Exception no capturada: ${exception}`)
});

process.on("message", message => {
    console.log("Este codigo se ejecutará cuando reciba un mensaje de otro proceso.");
    console.log(`Mensaje recibido: ${message}`);
});

export default program;