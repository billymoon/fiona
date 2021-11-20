declare namespace Fiona {
    type SeedType = number | string
    type PluginCallback = (seeded: Fiona.Moon) => any;
    type gender = 'male' | 'female'

    type OutputValues = string | null | number | boolean | Symbol | BigInt
    type OutputStructure = OutputValues | { [key: string]: OutputStructure } | OutputStructure[]

    type InputValues = OutputValues | RegExp
    type InputStructure = InputValues | { [key: string]: InputStructure } | InputStructure[] | PluginCallback

    interface Moon {
        object(input: { [key: string]: InputStructure }): { [key: string]: OutputStructure };
        object(input: InputStructure[]): OutputStructure[];
        object(input: string): string;
        object(input: number): number;
        object(input: InputStructure): OutputStructure;

        data: any | any[];
        [key: string]: PluginCallback,

        random: () => number;
        number: (options?: { max?: number, min?: number }) => number;
        bool: (options?: { chance?: number }) => boolean;
        date: (options?: { min?: string, max?: string, long?: boolean }) => string;
        array: (quantity: number | ((seeded: Fiona.Moon) => number), callback: (...arg: Parameters<PluginCallback>) => any) => OutputStructure[][];
        string: (rest: TemplateStringsArray) => string;
        regex: (pattern: RegExp) => string;
        json: (obj: any) => string;
        shuffle: (arr: any[]) => any[];
        choose: (qty: number, arr: any[]) => any[];
        oneOf: (arr: any[]) => any;
        lorem: (options?: { qty?: number }) => string;
        paragraph: () => string;
        sentence: () => string;
        word: () => string;
        gender: () => gender;
        title: (options?: { gender?: gender }) => string;
        firstname: (options?: { gender?: gender }) => string;
        surname: () => string;
        fullname: (options?: { gender?: gender }) => string;
        img: (options?: { width?: number, height?: number }) => string;
        info: () => { initseed: SeedType };
        duplicable: (options?: { frequency: number, pool: number }) => Moon;
        distribution: (clamp?: (input: number) => number) => Moon;
    }
    
    type MainFunction = (seed?: SeedType) => Moon;

    interface MainProps extends MainFunction {
        version: string;
        namedata: {
            male: {
                firstname: string[];
                title: string[];
            }
            female: {
                firstname: string[];
                title: string[];
            }
            lastname: string[];
        };
        register: (...plugins: (PluginCallback | [string, PluginCallback])[]) => void;

        Random: (...arg: Parameters<Moon['random']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['random']>;
        Number: (...arg: Parameters<Moon['number']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['number']>;
        Bool: (...arg: Parameters<Moon['bool']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['bool']>;
        Date: (...arg: Parameters<Moon['date']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['date']>;
        Array: (...arg: Parameters<Moon['array']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['array']>;
        String: (...arg: Parameters<Moon['string']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['string']>;
        Regex: (...arg: Parameters<Moon['regex']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['regex']>;
        Object: (...arg: Parameters<Moon['object']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['object']>;
        Json: (...arg: Parameters<Moon['json']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['json']>;
        Shuffle: (...arg: Parameters<Moon['shuffle']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['shuffle']>;
        Choose: (...arg: Parameters<Moon['choose']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['choose']>;
        OneOf: (...arg: Parameters<Moon['oneOf']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['oneOf']>;
        Lorem: (...arg: Parameters<Moon['lorem']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['lorem']>;
        Paragraph: (...arg: Parameters<Moon['paragraph']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['paragraph']>;
        Sentence: (...arg: Parameters<Moon['sentence']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['sentence']>;
        Word: (...arg: Parameters<Moon['word']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['word']>;
        Gender: (...arg: Parameters<Moon['gender']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['gender']>;
        Title: (...arg: Parameters<Moon['title']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['title']>;
        Firstname: (...arg: Parameters<Moon['firstname']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['firstname']>;
        Surname: (...arg: Parameters<Moon['surname']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['surname']>;
        Fullname: (...arg: Parameters<Moon['fullname']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['fullname']>;
        Img: (...arg: Parameters<Moon['img']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['img']>;
        Info: (...arg: Parameters<Moon['info']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['info']>;
        Duplicable: (...arg: Parameters<Moon['duplicable']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['duplicable']>;
        Distribution: (...arg: Parameters<Moon['distribution']>) => (...arg: Parameters<PluginCallback>) => ReturnType<Moon['distribution']>;
    }
}

declare module 'fiona' {
    const fionaModule: Fiona.MainProps;
    export = fionaModule;
}
