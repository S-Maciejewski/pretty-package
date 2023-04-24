import * as React from "react";

import TextareaAutosize from '@mui/base/TextareaAutosize';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
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

    return (
        // Make a full screen div with a toolbar at the top (with a logo and a menu button) and then two columns of equal width to a total of 100% width.
        // The left column should be a text input field with a button to submit at the bottom, the right should be an empty div.

        <div className={styles.mainView}>
            <div className={styles.toolbar}>
                <h1>Pretty Package</h1>
            </div>
            <div className={styles.content}>
                <div className='left'>
                    <TextareaAutosize
                        maxRows={40}
                        aria-label="input"
                        style={{width: 600}}
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
                                label="Output Markdown table"
                            />
                        </FormGroup>
                        <Button variant="contained" onClick={() => {
                            setOutput(translate(packageJsonContent, options))
                        }}>Submit
                        </Button>
                    </div>

                </div>
                <div className={styles.output}>
                    <Box component="span" sx={{display: 'block'}}>{`${output}`}</Box>
                </div>
            </div>
        </div>

    )
}
