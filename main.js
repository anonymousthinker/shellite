//Okay so what does a shell do basically. It is a repl that reads, evaluates,
//prints and loops this cycle.

const currDirectory = ['~'];

const handleExternalCommand = function (command, args) {
  return 'slt: command not found: ' + command;
};

const cd = function (args) {
  switch (args) {
    case '..':
      currDirectory.length !== 1 ? currDirectory.pop() : currDirectory;
      break;
    case '.':
      return currDirectory;
    default:
      currDirectory.push(args);
      break;
  }
};

const runCommand = function (commandInput) {
  const [command, ...args] = commandInput.split(' ');
  switch (command) {
    case 'echo':
      return args.join(' ');
    case 'cd':
      cd(args.join(' '));
      break;
    default:
      return handleExternalCommand(command, args);
  }
};

while (true) {
  const initialCommand = 'shelllite ' + currDirectory.at(-1) + ' %';
  const command = prompt(initialCommand);
  const result = runCommand(command);
  if (result !== undefined) {
    console.log(result);
  }
}