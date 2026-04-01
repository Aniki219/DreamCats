"use client"

import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Listbox, ListboxItem, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tabs, useDisclosure } from '@heroui/react';
import { useState } from 'react';
import { Expedition } from '@/app/actions/GetExpeditions';
import Image from 'next/image';

type DreamSelectModalProps = {
    expeditions: Expedition[],
    acceptedExpeditions: Expedition[],
    setAcceptedExpeditions: (e: Expedition[]) => void
}

export default function DreamSelectModal(props: DreamSelectModalProps) {
    const { expeditions, acceptedExpeditions, setAcceptedExpeditions } = props;

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedExpedition, setSelectedExpedition] = useState<Expedition>(expeditions?.[0]);

    return (
        <>
            <Button
                className="absolute top-55 left-30 text-center"
                onPress={onOpen}>View Assignments
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='max-w-2xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{selectedExpedition?.name}</ModalHeader>
                            <ModalBody>
                                <Table>
                                    <TableHeader>
                                        <TableColumn>Dream</TableColumn>
                                        <TableColumn>Description</TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className='align-top'>
                                                <DreamList
                                                    expeditions={expeditions}
                                                    setSelectedExpedition={setSelectedExpedition}
                                                    accepted={acceptedExpeditions}
                                                    selected={selectedExpedition}
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <DreamDescription
                                                    expedition={selectedExpedition}
                                                    accepted={acceptedExpeditions}
                                                    setAccepted={setAcceptedExpeditions}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Cancel
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Post to Dream Board
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

type DreamDescriptionProps = {
    expedition?: Expedition,
    accepted: Expedition[],
    setAccepted: (e: Expedition[]) => void
}

function DreamDescription(props: DreamDescriptionProps) {
    const { expedition, accepted, setAccepted } = props;
    const IMAGE_SIZE = 350;

    const accept = () => {
        if (!expedition) return
        const newAccepted = accepted.concat(expedition)
        setAccepted(newAccepted)
    }

    const revoke = () => {
        if (!expedition) return
        const newAccepted = accepted.filter(e => e.name !== expedition.name);
        setAccepted(newAccepted)
    }

    if (!expedition) return <></>
    return (
        <Card className="max-w-100">
            <CardHeader className="flex gap-3">
                <p className="text-md text-center">{expedition.name}</p>
            </CardHeader>
            <Divider />
            <CardBody>
                <div
                    className="flex items-center justify-center"
                    style={{ width: IMAGE_SIZE, height: IMAGE_SIZE }}
                >
                    <Image
                        src={`/${expedition.mapIcon}`}
                        alt="Map Icon"
                        width={IMAGE_SIZE}
                        height={IMAGE_SIZE}
                        className="object-contain" // Prevents stretching/cropping
                    />
                </div>
            </CardBody>
            <Divider />
            <CardBody>
                <div className="flex flex-row justify-between">
                    <div className='flex-1 text-orange-500'>
                        <p className="text-md">Max Cats</p>
                        <p className="text-md">Enemies</p>
                        <br></br>
                        <p>Description</p>
                    </div>
                    <div className='flex-2'>
                        <p className="text-md">{expedition.maxCats}</p>
                        <p className="text-md">{expedition.enemies.length}</p>
                        <br></br>
                        <p className="pr-1">{expedition.description}</p>
                    </div>
                </div>
            </CardBody>
            <Divider />
            <CardFooter className='flex-row-reverse'>
                {
                    expedition && accepted.includes(expedition) ?
                        <>
                            <Button className='bg-blue-700'
                                disabled={true}
                            >
                                Accepted
                            </Button>
                            <Button className='bg-red-700'
                                onPress={revoke}
                            >
                                Revoke
                            </Button>
                        </>
                        :
                        <Button className='bg-blue-700'
                            onPress={accept}
                        >
                            Accept
                        </Button>
                }
            </CardFooter>
        </Card>
    );
}

type DreamListProps = {
    expeditions: Expedition[],
    setSelectedExpedition: (expedition: Expedition) => void,
    accepted: Expedition[],
    selected: Expedition,
}

function DreamList(props: DreamListProps,) {
    const { expeditions, setSelectedExpedition, accepted } = props
    const acceptedKeys = accepted.map(d => d.name);

    return (
        <Listbox
            aria-label="Dynamic Actions"
            items={expeditions}
            className="justify-start"
            key={accepted.length}
            selectionMode='multiple'
            selectedKeys={new Set(acceptedKeys)}
            itemClasses={{
                base: "data-[selected=true]:text-gray-600",
            }}
        >
            {(item) => (
                <ListboxItem
                    key={item.name}
                    onPress={() => setSelectedExpedition(item)}
                    className={acceptedKeys.includes(item.name) ? "text-gray-600" : ""}
                >
                    {item.name}
                </ListboxItem>
            )}
        </Listbox>
    );
}
