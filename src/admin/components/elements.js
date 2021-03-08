import { Button, Modal } from '@wordpress/components';

export const ModalAlert = ( props ) => {
	return (
		<>
			<Modal
				overlayClassName="ds-modal-dialog"
				title={ props.title }
				onRequestClose={ props.closeModal }
			>
				{ props.text.first && <p>{ props.text.first }</p> }
				{ props.text.second && <p>{ props.text.second }</p> }
				{ props.modalAction && props.modalActionText && (
					<Button
						className="ds-modal-ation"
						isPrimary
						onClick={ props.modalAction }
					>
						{ props.modalActionText }
					</Button>
				) }
				<Button
					className="ds-modal-close"
					isSecondary
					onClick={ props.closeModal }
				>
					{ props.closeModalText }
				</Button>
			</Modal>
		</>
	);
};
