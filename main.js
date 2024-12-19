//Okay so what does a shell do basically. It is a repl that reads, evaluates,
//prints and loops this cycle.

const currDirectory = ['~'];
const files = [];
const directories = [];

const handleExternalCommand = function (command, args) {
  return 'slt: command not found: ' + command;
};

const mkdir = function (args) {
  directories.push(args);
};

const rm = function (args) {
  const file = args;
  const getFile = files.find((element) => element === file);
  if (getFile === undefined) {
    const message = 'rm: ' + file + ': No such file or directory';
    return message;
  }

  files.splice(files.indexOf(getFile), 1);
};

const touch = function (args) {
  files.push(args);
};

const ls = function () {
  const space = ' '.repeat(5);
  const status = directories.join(space) + space + files.join(space);
  return status;
};

const pwd = function () {
  const status = currDirectory.join('/');
  return status;
};

const cd = function (args) {
  const invalidCd = args === '..' && currDirectory.length === 1;
  const getBackUntilHomeDir = args === '..' && currDirectory.length !== 1;

  if (getBackUntilHomeDir) {
    currDirectory.pop();
    return;
  }

  if (args === '.' || invalidCd) {
    return;
  }

  currDirectory.push(args);
  return;
};

const echo = function (args) {
  return args;
};

const commands = [['echo', echo], ['cd', cd],
['pwd', pwd], ['touch', touch], ['ls', ls], ['rm', rm], ['mkdir', mkdir]];

const runCommand = function (commandInput) {
  const [command, ...args] = commandInput.split(' ');
  const cmdFn = commands.find((element) => element.includes(command));

  if (cmdFn === undefined) {
    return 'slt: command not found: ' + command;
  }

  return cmdFn[1](args.join(' ').trim());
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