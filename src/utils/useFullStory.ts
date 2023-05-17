import * as FullStory from '@fullstory/browser';
import {useEffect} from 'react';

type OneTrustEvent = Event & {
    detail: string[];
};

const createOneTrustScript = (): HTMLScriptElement => {
    console.log('step 9');
    const oneTrustScript = document.createElement('script');

    oneTrustScript.async = true;
    oneTrustScript.setAttribute('data-document-language', 'true');
    oneTrustScript.setAttribute('data-domain-script', '93c6bdec-8244-4cee-bea6-b38c2a1cbe63');
    oneTrustScript.src = 'https://cdn.cookielaw.org/scripttemplates/otSDKStub.js';
    oneTrustScript.type = 'text/javascript';
    oneTrustScript.id = 'oneTrustScript';

    return oneTrustScript;
};

export const useFullStory = (): void => {
    console.log('step 1');
    useEffect(() => {
        function toggleFullStory(event: Event): void {
            console.log('toggleFullStory', event);
            console.log('step 2');

            if ((event as OneTrustEvent).detail.includes('C0002')) {
                if (!FullStory.isInitialized()) {
                    console.log('step 3');
                    FullStory.init({
                        namespace: 'FS',
                        orgId: 'o-1JFSGF-na1',
                        script: 'edge.fullstory.com/s/fs.js'
                    });
                }
                console.log('step 4');
                FullStory.restart();
            } else {
                console.log('step 5');
                FullStory.shutdown();
            }
        }
        console.log('step 6');

        window.addEventListener('OneTrustGroupsUpdated', toggleFullStory);

        if (!document.getElementById('oneTrustScript')) {
            console.log('step 7');
            const oneTrustScript = createOneTrustScript();

            document.body.append(oneTrustScript);
        }

        return () => {
            console.log('step 8');
            window.removeEventListener('OneTrustGroupsUpdated', toggleFullStory);
        };
    }, []);
    console.log('step 10');
};
