import * as FullStory from '@fullstory/browser';
import {renderHook} from '@testing-library/react-hooks';
import {useFullStory} from './useFullStory';

jest.mock('@fullstory/browser', () => ({
    init: jest.fn(),
    isInitialized: jest.fn()
}));

describe('FullStory hook', () => {
    describe('when initialized', () => {
        it('should not re-initialize', () => {
            (FullStory.isInitialized as jest.Mock).mockReturnValue(true);

            renderHook(() => useFullStory());

            expect(FullStory.init).not.toBeCalled();
        });
    });

    describe('when not initialized', () => {
        it('should initialize when Performance option is checked', () => {
            (FullStory.isInitialized as jest.Mock).mockReturnValue(false);
            let oneTrustEvent: Event = {
                detail: string[];
            }
            renderHook(() => useFullStory());

            expect(FullStory.init).toBeCalledTimes(1);
            expect(FullStory.init).toBeCalledWith({
                namespace: 'FS',
                orgId: 'o-1JFSGF-na1',
                script: 'edge.fullstory.com/s/fs.js'
            });
        });
    });

    describe('when render hook', () => {
        it('should add the an event listener on toggleFullStory', () => {
            jest.spyOn(document.body, 'append');

            renderHook(() => useFullStory());

            expect(document.body.append).toBeCalledWith(
                expect.objectContaining({
                    id: 'oneTrustScript'
                })
            );
        });
    });
});
