export type Options = {
    includeLicense?: boolean
    includeUrl?: boolean
    includeVersion?: boolean
    includeDevDependencies?: boolean
}

export type TableObject = {
    name: string[]
    type?: ('prod' | 'dev')[]
    version?: string[]
    license?: string[]
    url?: string[]
}

export const translateToTable = (packageJsonContent: string, options: Options): TableObject => {
    const packageJson = JSON.parse(packageJsonContent)

    const dependencies: string[] = Object.keys(packageJson.dependencies)
    const devDependencies: string[] = []

    const table: TableObject = {name: dependencies}

    if (options.includeDevDependencies) {
        devDependencies.push(...Object.keys(packageJson.devDependencies))
        table.name.push(...devDependencies)
        // table.type = [...Array(dependencies.length).fill('prod'), ...Array(devDependencies.length).fill('dev')]
        table.type = table.name.map(name => dependencies.includes(name) ? 'prod' : 'dev')
    }

    if (options.includeVersion) {
        table.version = table.name.map(name => packageJson.dependencies[name] || packageJson.devDependencies[name])
    }

    console.table(table)
    return table
}

