import { screen, render, within, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './app';
import axiosMock from "axios";
import userEvent from '@testing-library/user-event';

// afterEach(cleanup);

describe("",() => {

    it("Should render an action button in the footer.", () => {
        render(<App />);
        const footer = screen.getByRole('contentinfo');
        const actionButton = within(footer).getByText(/Começar/);
        expect(actionButton).toBeInTheDocument();
    });
    
    it("Should render cards right side up at first.", async () => {

        axiosMock.get.mockResolvedValue({ 
            data: { 
                imageBackCard: "",
                imagesUrl: "",
                cards: [
                    {image: "", name: "a".repeat(5)}, 
                    {image: "", name: "b".repeat(5)}
                ] 
            } 
        });

        render(<App />);
        
        const cards = await screen.findAllByAltText(/carta de tarot do .+/i);
        expect(cards.length).toBe(2);
    });

    it("Should turn cards right side down after shuffle.", async () => {

        axiosMock.get.mockResolvedValue({ 
            data: { 
                imageBackCard: "",
                imagesUrl: "",
                cards: [
                    {image: "", name: "a".repeat(5)}, 
                    {image: "", name: "a".repeat(5)}, 
                    {image: "", name: "a".repeat(5)}, 
                    {image: "", name: "a".repeat(5)}, 
                    {image: "", name: "a".repeat(5)}, 
                    {image: "", name: "b".repeat(5)}
                ] 
            } 
        });

        render(<App />);
        
        const footer = screen.getByRole('contentinfo');
        const actionButton = within(footer).getByText(/Começar/);
        userEvent.click(actionButton);

        const frontCards = await screen.findAllByAltText(/carta de tarot do .+/i);
        const backCards = await screen.findAllByAltText(/carta virada/i);

        expect(backCards.length).toBe(6);
        expect(frontCards.length).toBe(0);
    });
})


