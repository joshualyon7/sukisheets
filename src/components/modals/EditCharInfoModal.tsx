import React, { Dispatch, FormEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { CharInfo, CharInfoAction } from '../../types/CharInfo';

export function EditCharInfoModal({ pc, dispatchPc, shown, setEditShown }:
    { pc: CharInfo, dispatchPc: Dispatch<CharInfoAction>, shown: boolean,
        setEditShown: (b: boolean) => void }) {
    const [tmpPc, setTmpPc] = useState(pc);

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        dispatchPc({ type: 'setCharInfo', payload: tmpPc });
    }

    return (
        <Modal show={ shown } onHide={ () => setEditShown(false) }>
            <Modal.Header closeButton>
                Edit Character Information
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    { /* eslint-disable-next-line no-extra-parens*/ }
                    <Form.Text onChange={(e) => setTmpPc({...tmpPc, name: (e.target as HTMLInputElement).value})}
                        placeholder={pc.name}>
                    </Form.Text>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setEditShown(false)}>Close</Button>
                <Button>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}