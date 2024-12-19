//Okay so what does a shell do basically. It is a repl that reads, evaluates,
//prints and loops this cycle.

const currDirectory = ['~'];
const files = [];

const handleExternalCommand = function (command, args) {
  return 'slt: command not found: ' + command;
};

const rm = function (args) {
  const file = args.join(' ');
  const getFile = files.find((element) => element === file);
  if (getFile === undefined) {
    const message = 'rm: ' + file + ': No such file or directory';
    return message;
  }

  files.splice(files.indexOf(getFile), 1);
};

const touch = function (args) {
  files.push(args.join(' '));
};

const ls = function () {
  console.log(files.join('    '));
};

const pwd = function () {
  console.log(currDirectory.join('/'));
};

const cd = function (args) {
  const arg = args.join(' ');
  switch (arg) {
    case '..':
      currDirectory.length !== 1 ? currDirectory.pop() : currDirectory;
      break;
    case '.':
      return currDirectory;
    default:
      currDirectory.push(arg);
  }
};

const echo = function (args) {
  return args.join(' ');
};

const commands = [['echo', echo], ['cd', cd],
['pwd', pwd], ['touch', touch], ['ls', ls], ['rm', rm]];

const runCommand = function (commandInput) {
  const [command, ...args] = commandInput.split(' ');
  const cmdFn = commands.find((element) => element.includes(command));
  return cmdFn[1](args);
};

const getCommand = function () {
  const initialCommand = 'shelllite ' + currDirectory.at(-1) + ' %';
  const command = prompt(initialCommand);
  return command;
};

const main = function () {
  while (true) {
    const command = getCommand();
    const result = runCommand(command);
    if (result !== undefined) {
      console.log(result);
    }
  }
};

main();