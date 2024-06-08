import { Schema } from '@sanity/schema';
import { htmlToBlocks } from '@sanity/block-tools';
import { JSDOM } from 'jsdom';
import { v4 as uuidv4 } from 'uuid';

const GenerateBlocks = async (htmlString: string) => {


    const defaultSchema = Schema.compile({
        name: 'default',
        types: [
            {
                type: 'object',
                name: 'myDocument',
                fields: [
                    {
                        title: 'Body',
                        name: 'body',
                        type: 'array',
                        of: [
                            { type: 'block' },
                        ],
                    },
                ],
            },
        ],
    });

    const blockContentType = defaultSchema.get('myDocument').fields.find((field: any) => field.name === 'body').type;

    const rules: any = {
        rules: [
            {
                deserialize(el: HTMLElement, next: any, block: any) {

                    if (el.tagName !== 'IMG') {

                        return undefined;
                    }

                    const src = el.getAttribute('src');
                    const alt = el.getAttribute('alt') || '';

                    return block({
                        _type: 'image',
                        tipo:"imagen",
                        asset: {
                            _ref:src,
                            _type:"reference"
                        },
                    })

                }
            },

            {
                deserialize(el: HTMLElement, next: any, block: any) {


                    if (el.tagName !== 'P') {
                        return undefined;
                    }
                    
                    return block(  {
                        "_key": uuidv4(),
                        "tipo":"parrafo",
                        "children": [
                            {
                                "_type": "span",
                                "marks": [],
                                "text": el.textContent?.trim(),
                                "_key": uuidv4()
                            }
                        ],
                        "markDefs": [],
                        "_type": "block",
                        "style": "normal"
                    },);

                }
            },

            {
                deserialize(el: HTMLElement, next: any, block: any) {

                    if (el.tagName !== 'IFRAME') {

                        return undefined;
                    }

                    const src = el.getAttribute('src');
                 

                    return block({
                        _type: 'iframe',
                        src
                    })

                }
            },
        ],
        parseHtml: (html: any) => new JSDOM(html).window.document
    };


    const blocks = htmlToBlocks(htmlString,blockContentType, rules)

    return { blocks }
};

export {
    GenerateBlocks
};
