import {getPackageLicense} from "./metadataRetriever";

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

export const translate = async (packageJsonContent: string, options: Options): Promise<string> => {
    const tableObject = await getTableObject(packageJsonContent, options)
    if (tableObject === false) {
        return 'Could not parse package.json'
    }
    return getTable(tableObject as TableObject, options)
}

const getTableObject = async (packageJsonContent: string, options: Options): Promise<TableObject | boolean> => {
    try {
        const packageJson = JSON.parse(packageJsonContent)

        const dependencies: string[] = Object.keys(packageJson.dependencies)
        const devDependencies: string[] = []

        const table: TableObject = {name: dependencies}

        if (options.includeDevDependencies) {
            if (packageJson.devDependencies) {
                devDependencies.push(...Object.keys(packageJson.devDependencies))
                table.name.push(...devDependencies)
                table.type = table.name.map(name => devDependencies.includes(name) ? 'dev' : 'prod')
            } else {
                console.warn('No devDependencies found in package.json')
            }
        }

        if (options.includeVersion) {
            table.version = table.name.map(name => packageJson.dependencies[name] || packageJson.devDependencies[name])
        }

        if (options.includeUrl) {
            table.url = table.name.map(name => `https://www.npmjs.com/package/${name}`)
        }

        if (options.includeLicense) {
            const licensePromises = table.name.map(name => getPackageLicense(name))
            table.license = await Promise.all(licensePromises)
        }

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
