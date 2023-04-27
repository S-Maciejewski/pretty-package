import * as React from "react";

import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LockIcon from '@mui/icons-material/Lock';
import styles from './Main.module.scss'

import {Options, translate} from "../service/translator";

export const MainView: React.FC = () => {
    const defaultOptions: Options = {
        includeDevDependencies: true,
        includeVersion: false,
        includeUrl: false,
        includeLicense: false,
        markdown: true,
    }

    const [packageJsonContent, setPackageJsonContent] = React.useState<string>('')
    const [options, setOptions] = React.useState<Options>(defaultOptions)
    const [output, setOutput] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false)

    return (
        <div className={styles.mainView}>
            <div className={styles.toolbar}>
                <h2>Pretty Package - get your Node.js dependencies in a clear, readable form.</h2>
                <h3> No worries, the contents of your package.json never leave your browser <LockIcon/></h3>
            </div>
            <div className={styles.content}>
                <div className='left'>
                    <h3>Paste the contents of your package.json file here</h3>
                    <TextareaAutosize
                        minRows={20}
                        maxRows={30}
                        aria-label="input"
                        style={{width: 500}}
                        value={packageJsonContent}
                        onChange={(event) => setPackageJsonContent(event.target.value)}
                    />
                    <div className={styles.controls}>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox checked={options.includeDevDependencies} onChange={e => setOptions({
                                    ...options,
                                    includeDevDependencies: e.target.checked
                                })}/>}
                                label="Include dev dependencies"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={options.includeVersion} onChange={e => setOptions({
                                    ...options,
                                    includeVersion: e.target.checked
                                })}/>}
                                label="Include version"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={options.includeUrl} onChange={e => setOptions({
                                    ...options,
                                    includeUrl: e.target.checked
                                })}/>}
                                label="Include URL"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={options.includeLicense} onChange={e => setOptions({
                                    ...options,
                                    includeLicense: e.target.checked
                                })}/>}
                                label="Include license"
                            />
                            <FormControlLabel
                                control={<Checkbox checked={options.markdown} onChange={e => setOptions({
                                    ...options,
                                    markdown: e.target.checked
                                })}/>}
                                label="Format as a Markdown table"
                            />
                        </FormGroup>
                        <Button variant="contained" onClick={async () => {
                            setLoading(true)
                            setOutput(await translate(packageJsonContent, options))
                            setLoading(false)
                        }}>
                            Format
                        </Button>
                    </div>

                </div>
                <div className={styles.output}>
                    <h3>Your dependencies, formatted</h3>
                    {!output && !loading && <p>Nothing here yet, paste your package.json and submit</p>}
                    {loading &&
                        <div>
                            <p>Loading...</p>
                        </div>
                    }
                    {!loading && output &&
                        <div>
                            <div className={styles.copyButton}>
                                <CopyToClipboard text={output}>
                                    <Button variant="contained" endIcon={<ContentCopyIcon/>}>Copy to clipboard</Button>
                                </CopyToClipboard>
                            </div>
                            <Box component="span" className={styles.outputBox}>{`${output}`}</Box>
                        </div>
                    }
                </div>
            </div>
        </div>

    )
}
