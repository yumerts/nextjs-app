import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button } from '@nextui-org/react';
import { useGameWebsocket } from './game_websocket_provider';

interface JoinGameModalContextType {
    showModal: boolean;
    opponentAddress: string;
    openModal: (match_id: number) => void;
    closeModal: () => void;
}

const JoinGameModalContext = createContext<JoinGameModalContextType | null>(null);

export const JoinGameModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    
    const [showModal, setShowModal] = useState(false);
    const [match_id, setMatchID] = useState(0);
    const [opponentAddress, setOpponentAddress] = useState('');

    const {connect} = useGameWebsocket();


    const openModal = (match_id: number) => {
        setMatchID(match_id);
        setShowModal(true);
    };

    const closeModal = () => setShowModal(false);
    return (
        <JoinGameModalContext.Provider value={{ showModal, opponentAddress, openModal, closeModal }}>
            {children}
            {
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <ModalContent>
                    <ModalHeader>
                        <h4>Opponent Found : {opponentAddress}</h4>
                    </ModalHeader>
                        <ModalBody>
                            Accept the match to join the game now!
                        </ModalBody>
                    <ModalFooter>
                        <Button onPress={() => {
                            connect(match_id)
                        }} color="primary">
                            Accept
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            }
        </JoinGameModalContext.Provider>
    );
}

export const useJoinGameModal = () => {
    const context = useContext(JoinGameModalContext);
    if (!context) {
        throw new Error('useJoinGameModal must be used within a JoinGameModalProvider');
    }
    return context;
}