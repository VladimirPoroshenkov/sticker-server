const DELETE_NOTE_SELECTORE = '.delete-note';
const EDITE_NOTE_CONTROLE_SELECTORE = '.edite-note-contact';
const NOTE_ITEM_SELECTORE = '.note';
const LIST_SELECTORE = '#list';
const ADD_NOTE_SELECTOR = '#addNoteBtn';

const noteTemolate = $(TEMPLATE_SELECTORE).html();
const EMPTY_NOTE = {
    description:' ',
};

let noteList = [];
const $noteList = $(LIST_SELECTORE)
    .on('click', DELETE_NOTE_SELECTORE, onDeleteClick)
    .on('focusout', EDITE_NOTE_CONTROLE_SELECTORE, onStickerFocusout )

$(ADD_NOTE_SELECTOR).on('click', onAddNoteBtnClick);

StickerApi.getList()
.then((list) => {
    noteList = list;

    renderStickers(list);
})

function onDeleteClick () {
    const id = getElementId($(this));

    deleteSticker(id);
}

function onStickerFocusout() {
    const $input = $(this);
    const id = getElementId($input);
    const changes ={
        description: $input.val().trim,
    };

    updateSticker(id. changes);
}

function onAddNoteBtnClick(e) {
    const sticker = getSticker();

    StickerApi
        .create(sticker)
        .then((newSticker) => {
            renderStickers(newSticker);
            setFocusByStickerId(newSticker.id)

            
        }) 
}

function setFocusByStickerId(id){
    const $newSticker = findStickerElById(id);
    const $descriptionInput = $newSticker.find(EDITE_NOTE_CONTROLE_SELECTORE);

    $descriptionInput.focus();
}

function getStickers() {
    return EMPTY_NOTE;
}

function renderStickers(stickers) { //JQUi подкл. виджеты
    const $stickers = stickers.map(generateStickerEl);

    $noteList.append($stickers);
}

function renderSticker(sticker) {
    const $sticker = generateStickersHtml(sticker);
    $noteList.append($sticker);
}

function generateStickerEl() { //JQUi подкл. виджеты
    const $stickerEl = $(generateStickersHtml(sticker));

    $sticker
        .css({
            left: sticker.left,
            top: sticker.top,
            // height: sticker.height,
            // width: sticker.width,
        })
        .draggable({
        handle:'.drag-note',
        stop:(_, ui) =>{
            updateSticker(sticker.id, ui.position)
        },
    })
    //     .resizeble({
    //     stop:(_, ui) =>{
    //         updateSticker(sticker.id, ui.size)
    //     },
    // });

    return $stickerEl
}

function generateStickerHtml(sticker) {
    return`
    <div class="note" data-id="${sticker.id}">
        <span class="delete-note">Delete</span>
        <span class="drag-note">Drag</span>
        <textarea 
        class="edit-note-controle" 
        name="description" 
        id=""
        >${sticker.description}
        </textarea>
    </div>
    `;
}


function getElementId($el) {
    const $sticker = getStickerEl($el);

    return String($sticker.data('id'));
}

function getStickerEl($el){
    return $el.clossest(NOTE_ITEM_SELECTORE);
}

function findStickerElById(id) {
    return $noteList.find(`{data-id="${id}"}`);
}

function deleteSticker(id) {
    StickerApi.delete(id)
        .then(() => {
            const $sticker = findStickerElById(id);

            noteList = noteList.filter(item => item.id !== id);
            $sticker.remove();
        })
}

function updateSticker(id, changes) {
    $stickerApi.update(id, changes)
        .then(() => {
            const sticker = noteList.find(item => item.id === id);

            Object.keys(changes).forEach(key => sticker[key] = changes[key]);
        })
}
