const inquirer  = require('./inquirer');
const { createDir, createFile, currentDate, capitalize } = require('../utils');

const header = `----------------------------
-- Copyright (C) 2021 CARTO
----------------------------`;

let root;
let name;
let cloud;
let type;

module.exports = {
    createModule: async (info) => {
        const response = await inquirer.askModuleDetails(info);

        root = info.root;
        name = response.name;
        cloud = response.cloud;
        type = info.type || response.type;

        createModule();
    }
};

function createModule () {
    createDir([root, 'modules']);
    createDir([root, 'modules', name]);
    createDir([root, 'modules', name, cloud]);
    createDir([root, 'modules', name, cloud, 'doc']);
    createDir([root, 'modules', name, cloud, 'lib']);
    createDir([root, 'modules', name, cloud, 'sql']);
    createDir([root, 'modules', name, cloud, 'test']);
    createDir([root, 'modules', name, cloud, 'test', 'unit']);
    createDir([root, 'modules', name, cloud, 'test', 'integration']);

    createDocIntro();
    createLibIndex();
    createTestIntegrationVersion();
    createTestUnitIndex();
    createChangelog();
    createMakefile();
    if (cloud === 'bigquery' || cloud === 'snowflake') {
        createPackage();
    }
    createReadme();
}

function createDocIntro () {
    const content = `## ${name}

<div class="badges"><div class="${type}"></div></div>

TODO.`;

    createFile([root, 'modules', name, cloud, 'doc', '_INTRO.md'], content);
}

function createLibIndex () {
    let content;
    switch (cloud){
    case 'bigquery':
    case 'snowflake':
        content = `import { version }  from '../package.json';

export default {
    version
};`;
        createFile([root, 'modules', name, cloud, 'lib', 'index.js'], content);
        break;

    case 'redshift':
        content = '__version__ = \'1.0.0\'\n';
        createFile([root, 'modules', name, cloud, 'lib', '_version.py'], content);
        content = 'from ._version import __version__ # noqa\n';
        createFile([root, 'modules', name, cloud, 'lib', '__init__.py'], content);
        break;
    }
}

function createTestIntegrationVersion () {
    const filename = { bigquery: 'EXAMPLE.test.js', snowflake: 'EXAMPLE.test.js', redshift: 'test_EXAMPLE.py' }[cloud];
    const cover = { bigquery: '`', snowflake: '' }[cloud];
    const variable = { bigquery: 'v', snowflake: 'V' }[cloud];
    const prefix = { bigquery: 'BQ_PREFIX', snowflake: 'SF_PREFIX', redshift: 'RS_PREFIX' }[cloud];
    let content;
    switch (cloud){
    case 'bigquery':
    case 'snowflake':
        content = `const { runQuery } = require('../../../../../${ type == 'advanced' ? 'core/': '' }common/${cloud}/test-utils');

test('Example of running a query', async () => {
    const query = 'SELECT 123 as v';
    const rows = await runQuery(query);
    expect(rows.length).toEqual(1);
    expect(rows[0].${variable}).toEqual(123);
});`;
        break;

    case 'redshift':
        content = `import os
import sys

# Include this to allow importing lib from source code
sys.path.insert(
    1, os.path.join(os.path.dirname(os.path.realpath(__file__)), '..', '..')
)
sys.path.insert(
    1,
    os.path.join(
        os.path.dirname(os.path.realpath(__file__)),
        '..',
        '..',
        '..',
        '..',
        '..',${ type == 'advanced' ? "\n\t\t'core',": '' }
        'common',
        'redshift',
    ),
)
`;

        createFile([root, 'modules', name, cloud, 'test', 'integration', '__init__.py'], content);

        content = `from test_utils import run_query


def test_sql_sample():
    result = run_query('SELECT 123')
    assert result[0][0] == 123
`;
        break;
    }

    createFile([root, 'modules', name, cloud, 'test', 'integration', filename], content);
}

function createTestUnitIndex () {
    const filename = { bigquery: 'index.test.js', snowflake: 'index.test.js', redshift: 'test_init.py' }[cloud];
    let content;
    switch (cloud){
    case 'bigquery':
    case 'snowflake':
        content = `const ${name}Lib = require('../../dist/index');
const version = require('../../package.json').version;

test('${name} library defined', () => {
    expect(${name}Lib.version).toBe(version);
});`;
        break;

    case 'redshift':
        content = `import os
import sys

# Include this to allow importing lib from source code
sys.path.insert(
    1, os.path.join(os.path.dirname(os.path.realpath(__file__)), '..', '..')
)
`;

        createFile([root, 'modules', name, cloud, 'test', 'unit', '__init__.py'], content);

        content = `from lib import ${name}Lib
from lib._version import __version__


def test_init():
    assert ${name}Lib.__version__ == __version__
`;
        break;
        
    }

    createFile([root, 'modules', name, cloud, 'test', 'unit', filename], content);
}

function createChangelog () {
    let content = `# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.0] - ${currentDate()}

### Added
- Create ${name} module.`

    createFile([root, 'modules', name, cloud, 'CHANGELOG.md'], content);
}

function createMakefile () {
    const content = `MODULE = ${name}

include ../../../common/${cloud}/Makefile`;

    createFile([root, 'modules', name, cloud, 'Makefile'], content);
}

function createPackage () {
    const cname = capitalize(name);
    const ccloud = { bigquery: 'BigQuery', snowflake: 'Snowflake' }[cloud];
    const content = `{
  "name": "${name}_${cloud}",
  "version": "1.0.0",
  "description": "${cname} module for ${ccloud}",
  "author": "CARTO",
  "license": "BSD-3-Clause",
  "private": true,
  "dependencies": {
  }
}`;

    createFile([root, 'modules', name, cloud, 'package.json'], content);
}

function createReadme () {
    const cname = capitalize(name);
    const ccloud = { bigquery: 'BigQuery', snowflake: 'Snowflake', redshift: 'Redshift' }[cloud];
    const content = `# ${cname} module for ${ccloud}

TODO: add module description.`;

    createFile([root, 'modules', name, cloud, 'README.md'], content);
}