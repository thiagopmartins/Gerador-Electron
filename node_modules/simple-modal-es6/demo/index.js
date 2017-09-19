import SimpleModal from '../dist/simple-modal-es6.min';

const content = `<div>
    <p>This is a modal with html content.</p>
    <a href="#" id="again">Change Content</a>
</div>`;

document.getElementById('anchor').onclick = function(event){
    event.preventDefault();

    SimpleModal.open(content);

    document.getElementById('again').onclick = function(event) {
        event.preventDefault();
        SimpleModal.open('<p>This content was added on the fly. The modal did not close.</p>');
    }
}
