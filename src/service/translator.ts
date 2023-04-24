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
    return getTable(tableObject, options)
}

export const getTableObject = (packageJsonContent: string, options: Options): TableObject => {
    const packageJson = JSON.parse(packageJsonContent)

    const dependencies: string[] = Object.keys(packageJson.dependencies)
    const devDependencies: string[] = []

    const table: TableObject = {name: dependencies}

    if (options.includeDevDependencies) {
        devDependencies.push(...Object.keys(packageJson.devDependencies))
        table.name.push(...devDependencies)
        table.type = table.name.map(name => dependencies.includes(name) ? 'prod' : 'dev')
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
}

export const getTable = (tableObject: TableObject, options: Options): string => {
    // TODO: markdown or csv depending on options.markdown
    const header = ` |  ${Object.keys(tableObject).join(' | ')}  | `
    const separator = ` | ${Object.keys(tableObject).map(() => '---').join(' | ')} | `
    const rows = tableObject.name.map((name, index) => {
        const row = Object.values(tableObject).map(value => value[index])
        return ` | ${row.join(' | ')} | `
    })
    const table = [header, separator, ...rows].join('\n')
    console.log(table)
    return table
}
