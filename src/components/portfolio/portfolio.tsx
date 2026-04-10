"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatCurrency, formatPercent, getChangeColor, getAtivoIcon, getAtivoLabel } from "@/lib/utils";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  TrendingUp, 
  TrendingDown,
  Wallet,
  Save,
  X,
  Calculator
} from "lucide-react";

interface PortfolioItem {
  id: string;
  ativo: string;
  quantidade: number;
  preco_medio: number;
}

interface PortfolioProps {
  initialItems?: PortfolioItem[];
  quotes?: Record<string, any>;
}

export function Portfolio({ initialItems = [], quotes = {} }: PortfolioProps) {
  const [items, setItems] = useState<PortfolioItem[]>(initialItems);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newItem, setNewItem] = useState({ ativo: "", quantidade: "", preco_medio: "" });

  const addItem = () => {
    if (!newItem.ativo || !newItem.quantidade || !newItem.preco_medio) return;
    
    const item: PortfolioItem = {
      id: Date.now().toString(),
      ativo: newItem.ativo.toUpperCase(),
      quantidade: parseFloat(newItem.quantidade),
      preco_medio: parseFloat(newItem.preco_medio),
    };
    
    setItems([...items, item]);
    setNewItem({ ativo: "", quantidade: "", preco_medio: "" });
    setIsAdding(false);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      const quote = quotes[item.ativo];
      const currentPrice = quote?.price || item.preco_medio;
      return total + (item.quantidade * currentPrice);
    }, 0);
  };

  const calculateTotalCost = () => {
    return items.reduce((total, item) => {
      return total + (item.quantidade * item.preco_medio);
    }, 0);
  };

  const calculateTotalGain = () => {
    const total = calculateTotal();
    const cost = calculateTotalCost();
    return total - cost;
  };

  const calculateGainPercent = () => {
    const cost = calculateTotalCost();
    if (cost === 0) return 0;
    return (calculateTotalGain() / cost) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="glass" className="bg-emerald-500/10 border-emerald-500/20">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Wallet className="w-4 h-4" />
              <span className="text-sm">Patrimônio Total</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(calculateTotal())}
            </p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Calculator className="w-4 h-4" />
              <span className="text-sm">Custo Total</span>
            </div>
            <p className="text-2xl font-bold text-white">
              {formatCurrency(calculateTotalCost())}
            </p>
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              {calculateTotalGain() >= 0 ? (
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-rose-400" />
              )}
              <span className="text-sm">Lucro/Prejuízo</span>
            </div>
            <p className={cn("text-2xl font-bold", getChangeColor(calculateTotalGain()))}>
              {calculateTotalGain() >= 0 ? "+" : ""}{formatCurrency(calculateTotalGain())}
            </p>
            <p className={cn("text-sm", getChangeColor(calculateGainPercent()))}>
              {formatPercent(calculateGainPercent())}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Add New Item */}
      {isAdding && (
        <Card variant="glass" className="border-emerald-500/50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <Input
                placeholder="Ativo (ex: PETR4)"
                value={newItem.ativo}
                onChange={(e) => setNewItem({ ...newItem, ativo: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Quantidade"
                value={newItem.quantidade}
                onChange={(e) => setNewItem({ ...newItem, quantidade: e.target.value })}
              />
              <Input
                type="number"
                placeholder="Preço médio"
                value={newItem.preco_medio}
                onChange={(e) => setNewItem({ ...newItem, preco_medio: e.target.value })}
              />
              <div className="flex gap-2">
                <Button onClick={addItem} className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Salvar
                </Button>
                <Button variant="ghost" onClick={() => setIsAdding(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Add Button */}
      {!isAdding && (
        <Button onClick={() => setIsAdding(true)} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Ativo
        </Button>
      )}

      {/* Portfolio List */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <Card variant="glass">
            <CardContent className="py-12 text-center">
              <Wallet className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Sua carteira está vazia</p>
              <p className="text-sm text-slate-500">Adicione seus investimentos para acompanhar</p>
            </CardContent>
          </Card>
        ) : (
          items.map((item) => {
            const quote = quotes[item.ativo];
            const currentPrice = quote?.price || item.preco_medio;
            const valorAtual = item.quantidade * currentPrice;
            const valorCusto = item.quantidade * item.preco_medio;
            const lucro = valorAtual - valorCusto;
            const lucroPercent = ((valorAtual - valorCusto) / valorCusto) * 100;

            return (
              <Card key={item.id} variant="glass" hover>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{getAtivoIcon(item.ativo)}</span>
                      <div>
                        <p className="font-semibold text-white">{getAtivoLabel(item.ativo)}</p>
                        <p className="text-sm text-slate-400">{item.ativo} • {item.quantidade} cotas</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-white">{formatCurrency(valorAtual)}</p>
                      <div className={cn("flex items-center gap-1 text-sm", getChangeColor(lucro))}>
                        {lucro >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span>{formatCurrency(lucro)} ({formatPercent(lucroPercent)})</span>
                      </div>
                    </div>

                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-slate-400 hover:text-rose-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}