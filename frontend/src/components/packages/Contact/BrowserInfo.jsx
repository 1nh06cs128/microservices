import React, { useEffect, useState } from 'react';

const BrowserInfo = () => {
    const [browserInfo, setBrowserInfo] = useState({
        userAgent: '',
        browserName: '',
        // isMobile: false,
        platform: '',
        browserVersion: '',
        language: '',
        screenResolution: '',
        timezoneOffset: ''
    });

    useEffect(() => {
        setBrowserInfo({
            userAgent: navigator.userAgent,
            browserName: navigator.userAgentData.brands[0].brand,
            // isMobile: navigator.userAgentData.mobile,
            platform: navigator.userAgentData.platform,
            browserVersion: navigator.appVersion,
            language: navigator.language,
            screenResolution: `${screen.width}x${screen.height}`,
            timezoneOffset: new Date().getTimezoneOffset()
        });
    }, [browserInfo.userAgent]);
    // Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    // }, [browserInfo]); // this has the reference to object which results in memory leak on browser.


    const { userAgent, browserName, isMobile, platform, browserVersion, language, screenResolution, timezoneOffset } = browserInfo;

    return (
        <div className="">
            <h1 className="mt-2"><strong>Browser Information : Some content reading from 'navigator' & 'screen' objects</strong></h1>
            <p className="mt-2"><strong>User Agent: </strong> <span className="text-sm">{userAgent}</span></p>
            <p className="mt-2"><strong>Browser Name: </strong> <span className="text-sm">{browserName}</span></p>
            <p className="mt-2"><strong>Browser Platform: </strong> <span className="text-sm">{platform}</span></p>
            {/* <p className="mt-2"><strong>Mobile Browser: </strong> <span className="text-sm">{Boolean(isMobile)}</span></p> */}
            <p className="mt-2"><strong>Browser Version: </strong> <span className="text-sm">{browserVersion}</span></p>
            <p className="mt-2"><strong>Language: </strong> <span className="text-sm">{language}</span></p>
            <p className="mt-2"><strong>Screen Resolution: </strong> <span className="text-sm">{screenResolution}</span></p>
            <p className="mt-2"><strong>Timezone Offset: </strong> <span className="text-sm">{timezoneOffset}</span></p>
        </div>
    );
};

export default BrowserInfo;
