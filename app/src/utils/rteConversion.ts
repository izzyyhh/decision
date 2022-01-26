import { ContentState, convertFromHTML, convertFromRaw, convertToRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

export function convertToRDCS(htmlFragment: string) {
    // Convert HTML into object with two keys: contentBlocks and entityMap
    const contentHtml = convertFromHTML(htmlFragment);
    // Generate a ContentState object
    const state = ContentState.createFromBlockArray(contentHtml.contentBlocks, contentHtml.entityMap);
    // Stringify the "state" object from a Draft.Model.Encoding.RawDraftContentState object
    return JSON.stringify(convertToRaw(state));
}

export function convertToHTML(raw: string) {
    // Convert the raw state back to a useable ContentState object
    const contentState = convertFromRaw(JSON.parse(raw));
    return stateToHTML(contentState);
}
