export const mapCheckout = data => ({
	name: data.name.trim(),
	surname: data.surname.trim(),
	email: data.email.trim(),
	phone: data.phone.replaceAll(' ', ''),
	address: data.address.trim(),
	comment: data.comment.trim(),
});
