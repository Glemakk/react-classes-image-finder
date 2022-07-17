import React from 'react';
import { Oval } from 'react-loader-spinner';
import { ReactLoader } from './Loader.styled';

function Loader() {
    return (
        <ReactLoader>
            <Oval
                type="MutatingDots"
                color="#3f51b5"
                secondaryColor="#fff"
                height={100}
                width={100}
                strokeWidth={5}
                timeout={3000}
            />
            {/* <Oval /> */}
        </ReactLoader>
    );
}

export default Loader;