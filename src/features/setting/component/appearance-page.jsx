import { Separator } from '@/components/ui/separator';

import catImage from '../asset/cat.jpg';
import withScrollbarTheme from '../hoc/scroll-bar';
import themes from '../test/data/themes';
import Theme from './app-theme';

function Appearance() {
    return (
        <div className="container-ns flex w-[74.4vw] flex-col overflow-auto">
            <div className="group bg-background sticky mx-3 flex flex-col gap-4 pt-8 pb-[14px] text-2xl font-light">
                {'Appearance'}
                <Separator />
            </div>

            <div className="flex flex-col">
                <div className="flex items-center justify-center">
                    <form className="grid w-full grid-cols-3 gap-4">
                        {themes.map((theme, index) => (
                            <label
                                key={index}
                                className="cursor-pointer rounded-md"
                            >
                                <Theme name={theme} image={catImage}></Theme>
                            </label>
                        ))}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withScrollbarTheme(Appearance);
