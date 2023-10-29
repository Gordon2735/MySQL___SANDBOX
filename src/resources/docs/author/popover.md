# Notes on HTML's popover

-   this code did not work because TypeScript did not recognize the `hidePopover` not the `showPopover` method

```ts
setTimeout(async (): Promise<void> => {
	const hidePopover: HTMLElement['hidePopover'] = (): void => {
		body?.hidePopover();
	};
	hidePopover();
	// res.redirect('/login?username=user/data_view');
}, 1500) as NodeJS.Timeout;

setTimeout(async (): Promise<void> => {
	const showPopover: HTMLElement['showPopover'] = (): void => {
		loginBody?.showPopover();
	};
	showPopover();
}, 1500);
```
