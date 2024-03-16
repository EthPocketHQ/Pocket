import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Token } from "@/models/Token";
import { formatWei } from "@/utils/formatNumber";
import ethers from 'ethers';
type Props = {
    tokensList: Token[] | null;
};
export function BalanceList({tokensList}: Props) {

    return (
        <div className="space-y-8">
            {tokensList && tokensList?.map((token, index) => {
                if (!token?.token) return null;
                return (
                    <div key={index} className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={token?.token?.logoUri ?? ''} alt="Avatar" />
                            <AvatarFallback>{token.token.symbol}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{token.token.name}</p>
                            <p className="text-sm text-muted-foreground">
                                {token.tokenAddress}
                            </p>
                        </div>
                        <div className="ml-auto font-medium">{ formatWei(token.balance)}</div>
                    </div>
                );
            })}
        </div>
    );
}