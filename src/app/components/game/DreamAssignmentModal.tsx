"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@heroui/react';
import { useState } from 'react';
import DreamCarousel from '../Carousel/DreamCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { Expedition } from '@/app/actions/GetExpeditions';

const OPTIONS: EmblaOptionsType = { loop: false, watchDrag: false, startIndex: 1 }

type DreamAssignmentModalProps = {
    expeditions: Expedition[]
    acceptedExpeditions: Expedition[]
}

export default function DreamAssignmentModal(props: DreamAssignmentModalProps) {
    const { expeditions, acceptedExpeditions } = props;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedExpedition, setSelectedExpedition] = useState<Expedition>(expeditions?.[0]);

    return (
        <>
            <Button
                className="absolute top-25 left-70 text-center"
                onPress={onOpen}>Open Dream Board
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='max-w-2xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{selectedExpedition?.name}</ModalHeader>
                            <ModalBody>
                                <DreamCarousel
                                    options={OPTIONS}
                                    selectedExpedition={selectedExpedition}
                                    setSelected={setSelectedExpedition}
                                    expeditions={acceptedExpeditions}
                                />
                                {CatTable()}
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

function CatTable() {
    const selectedColor = "primary";

    return (
        <div className="flex flex-col gap-3">
            <Table
                aria-label="Example static collection table"
                color={selectedColor}
                selectionMode="multiple"
            >
                <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>Tony Reichert</TableCell>
                        <TableCell>CEO</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key="2">
                        <TableCell>Zoey Lang</TableCell>
                        <TableCell>Technical Lead</TableCell>
                        <TableCell>Paused</TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>Jane Fisher</TableCell>
                        <TableCell>Senior Developer</TableCell>
                        <TableCell>Active</TableCell>
                    </TableRow>
                    <TableRow key="4">
                        <TableCell>William Howard</TableCell>
                        <TableCell>Community Manager</TableCell>
                        <TableCell>Vacation</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}
