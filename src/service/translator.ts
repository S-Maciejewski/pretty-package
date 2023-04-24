export type Options = {
    includeDevDependencies?: boolean
    includeVersion?: boolean
    includeUrl?: boolean
    includeLicense?: boolean
    markdown?: boolean
}

export type TableObject = {
    name: string[]
    type?: ('prod' | 'dev')[]
    version?: string[]
    license?: string[]
    url?: string[]
}

export const translate = (packageJsonContent: string, options: Options) => {
    const tableObject = getTableObject(packageJsonContent, options)
    if (tableObject === false) {
        return 'Could not parse package.json'
    }
    return getTable(tableObject as TableObject, options)
}

const getTableObject = (packageJsonContent: string, options: Options): TableObject | boolean => {
    try {
        const packageJson = JSON.parse(packageJsonContent)

        const dependencies: string[] = Object.keys(packageJson.dependencies)
        const devDependencies: string[] = []

        const table: TableObject = {name: dependencies}

        if (options.includeDevDependencies) {
            if (packageJson.devDependencies) {
                devDependencies.push(...Object.keys(packageJson.devDependencies))
                table.name.push(...devDependencies)
                table.type = table.name.map(name => dependencies.includes(name) ? 'prod' : 'dev')
            } else {
                console.warn('No devDependencies found in package.json')
            }

        }

        if (options.includeVersion) {
            table.version = table.name.map(name => packageJson.dependencies[name] || packageJson.devDependencies[name])
        }

        // TODO: async get license and url
        if (options.includeUrl) {
            table.url = []
        }
        if (options.includeLicense) {
            table.license = []
        }

        console.table(table)
        return table
    } catch (e) {
        console.error('Could not parse package.json')
        return false
    }
}

const getTable = (tableObject: TableObject, options: Options): string => {
    if (options.markdown) {
        return getMarkdownTable(tableObject)
    } else {
        return getCsvTable(tableObject)
    }
}

const getMarkdownTable = (tableObject: TableObject): string => {
    const header = ` |  ${Object.keys(tableObject).join(' | ')}  | `
    const separator = ` | ${Object.keys(tableObject).map(() => '---').join(' | ')} | `
    const rows = tableObject.name.map((name, index) => {
        const row = Object.values(tableObject).map(value => value[index])
        return ` | ${row.join(' | ')} | `
    })
    return [header, separator, ...rows].join('\n')
}

const getCsvTable = (tableObject: TableObject): string => {
    const header = Object.keys(tableObject).join(',')
    const rows = tableObject.name.map((name, index) => {
        const row = Object.values(tableObject).map(value => value[index])
        return row.join(',')
    })
    return [header, ...rows].join('\n')
}
