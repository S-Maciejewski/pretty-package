import TextareaAutosize from '@mui/base/TextareaAutosize';
import * as React from "react";
import {Options, translateToTable} from "../service/translator";

export const MainView: React.FC = () => {
    const options: Options = {
        includeDevDependencies: true,
        includeVersion: true,
    }

    const [packageJsonContent, setPackageJsonContent] = React.useState<string>('')

    return (
        // Make a full screen div with a toolbar at the top (with a logo and a menu button) and then two columns of equal width to a total of 100% width.
        // The left column should be a text input field with a button to submit at the bottom, the right should be an empty div.

        <div className='main-view'>
            <div className='toolbar'>
                <h1>Pretty Package</h1>
            </div>
            <div className='content'>
                <div className='left'>
                    <TextareaAutosize
                        maxRows={4}
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        style={{width: 200}}
                        value={packageJsonContent}
                        onChange={(event) => setPackageJsonContent(event.target.value)}
                    />
                    <button onClick={() => {
                        translateToTable(packageJsonContent, options)
                    }}>Submit
                    </button>
                </div>
                <div className='right'>
                    output
                </div>
            </div>
        </div>

    )
}
